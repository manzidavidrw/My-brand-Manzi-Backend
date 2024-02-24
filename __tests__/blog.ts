import{test,it,describe,expect,beforeAll,afterAll} from '@jest/globals';
import app from '../src/app';
import superApp, {Request, Response} from 'supertest'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import supertest from 'supertest';

dotenv.config();
const dbURI = process.env.MONGODB_URI || '';

beforeAll(async() =>{
    await mongoose.connect(dbURI);
},80000);


afterAll(async() =>{
  await mongoose.connection.close();
},80000);

describe('test Blog APIs', () =>{
  it('/api/ for 404', async()=>{
      const result  = await supertest(app).get('/api/');
      expect(result.status).toBe(404);
  })
  it('/api/ for 404', async()=>{
      const show  = await supertest(app).get('/api/blogs');
      expect(show.status).toBe(500);
  },50000)
  it('getting a blog by ID', async()=>{
    const show  = await supertest(app).get('/api/blogs/:id');
    expect(show.status).toBe(500);
})
it('Post a Blog', async()=>{
  const show  = await supertest(app).post('/api/blogs');
  expect(show.status).toBe(400);
})
it('delete a Blog', async()=>{
  const show  = await supertest(app).delete('/api/blogs/:id');
  expect(show.status).toBe(500);
})
it('update a Blog', async()=>{
  const show  = await supertest(app).patch('/api/blogs/:id');
  expect(show.status).toBe(400);
})
  it('get a querry', async()=>{
    const show  = await supertest(app).get('/api/messages');
    expect(show.status).toBe(500);
},50000)
it('signup', async()=>{
    const show  = await supertest(app).post('/api/signup');
    expect(show.status).toBe(400);
},50000)
it('Login', async()=>{
    const show  = await supertest(app).post('/api/login');
    expect(show.status).toBe(400);
},50000)
});


describe('test querry APIs', () =>{
  it('create a querry', async()=>{
      const result  = await supertest(app).post('/api/');
      expect(result.status).toBe(404);
  })
  it('getting All messages', async()=>{
      const show  = await supertest(app).get('/api/messsages');
      expect(show.status).toBe(404);
  },50000)
  it('getting messages by id', async()=>{
    const show  = await supertest(app).get('/api/messsages/:id');
    expect(show.status).toBe(404);
},50000)
it('update a message', async()=>{
  const show  = await supertest(app).patch('/api/messsages/:id');
  expect(show.status).toBe(404);
},50000)
it('delete a message', async()=>{
  const show  = await supertest(app).get('/api/messsages/:id');
  expect(show.status).toBe(404);
},50000)
  
})

describe('comments APIs', () =>{
  it('create a comment', async()=>{
      const result  = await supertest(app).post('/api/blogs/:id/comments');
      expect(result.status).toBe(400);
  })
  it('get a comment', async()=>{
    const result  = await supertest(app).get('/api/blogs/:id/comments');
    expect(result.status).toBe(500);
},50000)
it('update a comment', async()=>{
  const result  = await supertest(app).patch('/api/blogs/:id/comments');
  expect(result.status).toBe(404);
},50000)
it('delete a comment', async()=>{
  const result  = await supertest(app).delete('/api/blogs/:id/comments');
  expect(result.status).toBe(500);
},50000)

})


