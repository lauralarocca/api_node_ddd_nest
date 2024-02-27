import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ) {
    const comments = await this.prisma.comment.findMany({
      where: {
        answerId,
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

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return comments.map(PrismaAnswerCommentMapper.toDomain)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!answerComment) {
      return null
    }

    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async create(answer: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answer)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answer: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }
}
