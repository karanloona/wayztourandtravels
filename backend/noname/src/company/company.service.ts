import { Injectable } from '@nestjs/common';
import { CompanyDao } from './company.dao';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';
import { AuthDao } from '../auth/auth.dao';

@Injectable()
export class CompanyService {
  constructor(
  ) {}

}