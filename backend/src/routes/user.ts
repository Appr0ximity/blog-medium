import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign } from "hono/jwt"
import { Hono } from "hono";
import { signinInput, SigninType, signupInput, SignupType } from "@appr0ximity/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const success = signupInput.safeParse(body)
    
    if(!success){
      return c.json({
        message :"Invalid inputs"
      }, 403)
    }

    const userData: SignupType = {
      email: body.email,
      name: body.name,
      password: body.password
    }
  
    try {
      const user  = await prisma.user.create({
        data:{
          name: userData.name,
          email: userData.email,
          password: userData.password
        }
      })
      const token = await sign({id: user.id}, c.env.SECRET_KEY)
      return c.json({
        message: "User created successfully!",
        token: token
      }, 200)
    } catch (e) {
      return c.json({
        message: "Error while creating the user",
        error: e
      }, 411)
    }
  })
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const success = signinInput.safeParse(body)

    if(!success){
      return c.json({
        message: "Invalid Inputs"
      }, 403)
    }

    const userData: SigninType = {
      email: body.email,
      password: body.password
    }

    try {
      const user  = await prisma.user.findUnique({
        where:{
          email: userData.email,
          password: userData.password
        }
      })
      if(user){
        const token = await sign({id: user.id}, c.env.SECRET_KEY)
        return c.json({
          message: "User signed in successfully!",
          token: token
        }, 200)
      }
      return c.json({
        message: "Invalid credentials"
      }, 403)
    } catch (e) {
      return c.json({
        message: "DB connection error",
        error: e
      }, 411)
    }
  })