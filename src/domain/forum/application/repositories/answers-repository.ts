import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export abstract class AnswersRepository {
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>

  abstract save(answer: Answer): Promise<void>
  abstract findById(id: string): Promise<Answer | null>
  abstract delete(answer: Answer): Promise<void>
  abstract create(answer: Answer): Promise<void>
}
