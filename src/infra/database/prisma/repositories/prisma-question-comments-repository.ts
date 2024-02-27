import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionCommentsReposity
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ) {
    const comments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return comments.map(PrismaCommentWithAuthorMapper.toDomain)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return comments.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async create(question: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(question)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(question: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: question.id.toString(),
      },
    })
  }
}
