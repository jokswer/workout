import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from '../templates.controller';
import { TemplatesService } from '../templates.service';
import { CreateTemplateDto } from '../schemas/createTemplate.schema';

const mockTemplate = {
  id: 1,
  name: 'Test Template',
  description: 'desc',
  exercises: [],
};

const mockService = {
  create: jest.fn().mockResolvedValue(mockTemplate),
};

describe('TemplatesController', () => {
  let controller: TemplatesController;
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        {
          provide: TemplatesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto', async () => {
    const dto: CreateTemplateDto = {
      name: 'Template 1',
      exercises: [],
    };

    await controller.createTemplate(dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.createUserTemplate).toHaveBeenCalledWith(dto);
  });

  it('should return the created template', async () => {
    const dto: CreateTemplateDto = {
      name: 'Template 1',
      exercises: [],
    };

    const result = await controller.createTemplate(dto);
    expect(result).toEqual(mockTemplate);
  });
});
