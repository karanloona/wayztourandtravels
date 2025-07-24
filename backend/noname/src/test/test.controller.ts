import { Controller, Get } from "@nestjs/common";

@Controller()
export class TestController {
    @Get('')
    getHello() {
        return 'Hello World!'
    }
}