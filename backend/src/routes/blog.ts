import { blogCreateInput, BlogCreateType, blogEditInput, BlogEditType } from "@appr0ximity/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use('/*', async (c, next)=>{
    const token = c.req.header('Authorization')
    if(!token){
        return c.json({
            message: "Login to use the route!"
        }, 403)
    }
    const temp = await verify(token, c.env.SECRET_KEY)
    if(temp){
        c.set("userId", temp.id as string)
        await next()
    }else{
        return c.json({
            message:"Invlid user"
        }, 403)
    }
})


blogRouter.post('/', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json()

    const success = blogCreateInput.safeParse(body)

    if(!success){
        return c.json({
            message :"Invalid inputs"
        }, 403)
    }

    const authorId = c.get("userId")

    const blogData: BlogCreateType = {
        title : body.title,
        content: body.content,
        image: body.image
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: blogData.title,
                content: blogData.content,
                authorId: authorId,
                image: blogData.image
            }
        })

        return c.json({
            message: "Blog created successfully!",
            blog
        }, 200)
    } catch (e) {
        return c.json({
            message: "Error while creating the blog!"
        }, 411)
    }
  })
  
blogRouter.put('/:id', async  (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json()

    const success = blogEditInput.safeParse(body)

    if(!success){
        return c.json({
            message :"Invalid inputs"
        }, 403)
    }

    const id = c.req.param("id")

    const blogData: BlogEditType = {
        title : body.title,
        content: body.content,
        image: body.image
    }

    try {
        const blog = await prisma.post.update({
            where:{
                id: id
            },
            data: {
                title: blogData.title,
                content: blogData.content,
                image: blogData.image
            }
        })

        return c.json({
            message: "Blog updated successfully!"
        }, 200)
    } catch (e) {
        return c.json({
            message: "Error while updating the blog!"
        }, 411)
    }
})

blogRouter.get('/bulk', async  (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany()

        return c.json(blogs, 200)
    } catch (e) {
        return c.json({
            message: "Error while fetching the blogs!"
        }, 411)
    }
})

blogRouter.get('/:id', async  (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json()

    const blogData = {
        id: c.req.param("id"),
        title : body.title,
        content: body.content
    }

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: blogData.id
            }
        })

        return c.json({
            message: "Blog found successfully!",
            blog: blog
        }, 200)
    } catch (e) {
        return c.json({
            message: "Error while finding the blog!"
        }, 411)
    }
})