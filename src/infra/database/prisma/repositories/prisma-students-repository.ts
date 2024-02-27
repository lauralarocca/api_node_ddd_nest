import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  // async findManyRecent({ page }: PaginationParams): Promise<Student[]> {
  //   const students = await this.prisma.user.findMany({
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     take: 20,
  //     skip: (page - 1) * 20,
  //   })

  //   return students.map(PrismaStudentMapper.toDomain)
  // }

  // async save(student: Student): Promise<void> {
  //   const data = PrismaStudentMapper.toPrisma(student)

  //   await this.prisma.user.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data,
  //   })
  // }

  // async findById(id: string): Promise<Student | null> {
  //   const student = await this.prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //   })

  //   if (!student) {
  //     return null
  //   }

  //   return PrismaStudentMapper.toDomain(student)
  // }

  // async delete(student: Student): Promise<void> {
  //   const data = PrismaStudentMapper.toPrisma(student)

  //   await this.prisma.user.delete({
  //     where: {
  //       id: data.id,
  //     },
  //   })
  // }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}
