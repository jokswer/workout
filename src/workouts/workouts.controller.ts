import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkoutsService } from './workouts.service';

// | Метод    | Путь            | Описание                                                                   |
// | -------- | --------------- | -------------------------------------------------------------------------- |
// | `GET`    | `/workouts`     | Список тренировок текущего пользователя (с пагинацией и фильтрами по дате) |
// | `POST`   | `/workouts`     | Создать новую запись тренировки                                            |
// | `GET`    | `/workouts/:id` | Получить детали одной тренировки                                           |
// | `PUT`    | `/workouts/:id` | Обновить запись тренировки                                                 |
// | `DELETE` | `/workouts/:id` | Удалить запись тренировки                                                  |

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}
}
