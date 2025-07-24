import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users, UserType } from './users.entity';
import { CreateUserDTO, LoginDTO, PasswordDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

export class AuthDao {
  private readonly saltOrRounds = 10;

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const hash = await bcrypt.hash(dto.password, this.saltOrRounds);
    const user = this.userRepository.create({
      username: dto.username,
      password: hash,
      userType: dto.userType, // No casting needed; type matches
    });
    return await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user) {
      return { message: 'wrong username' };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }

  async loginUser(username: string) {

    
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .select([
        'user.id AS _id',
        'user.username',
        'user.userType',
      ])
      .getRawOne();

    if (!user) {
      throw new Error('User does not exist');
    }

    return {
      _id: user._id,
      username: user.username,
      userType: user.userType,
      companyId: user.companyId || null,
    };
  }

  async changePassword(dto: PasswordDTO) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) {
      return { message: 'wrong username' };
    }
    const hash = await bcrypt.hash(dto.password, this.saltOrRounds);
    await this.userRepository.update({ id: dto.userId }, { password: hash });
    return { message: 'Password updated successfully' };
  }
}