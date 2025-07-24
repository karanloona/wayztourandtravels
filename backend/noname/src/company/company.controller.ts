import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { API_BEARER_AUTH_NAME, JwtAuthGaurd } from "../gaurds/jwt-auth.gaurd";
import { CreateCompanyDTO, DeleteCompanyDTO, UpdateCompanyDTO } from "./company.dto";
import { CompanyService } from "./company.service";
import { CheckUser } from "../auth/auth.dto";
import { Request } from 'express';

@ApiTags('company')
@Controller('company')
@UseGuards(JwtAuthGaurd)
@ApiBearerAuth(API_BEARER_AUTH_NAME)
export class CompanyController {
    constructor(private readonly companySerivce:CompanyService) {}
   
}