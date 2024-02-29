import{it,describe,expect,beforeAll,afterAll, jest, afterEach, beforeEach} from '@jest/globals';
import app from '../src/app';
import  { closeServer } from '../src/server'
import mongoose from 'mongoose';
import _ from 'lodash';
import dotenv from 'dotenv';
import supertest from 'supertest';
import { createLike } from '../src/controllers/likeController';
import { Request, Response } from 'express';
import { blogValidationSchema } from '../src/validators/BlogValidationSchema';
import { likeSchema } from '../src/validators/likeValidators';
import { messageSchema } from '../src/validators/messageValidotors';
import { getMessageById,getMessages,updateMessage,deleteMessage } from '../src/controllers/messageController';
import Message  from '../src/models/Message';
import upload from '../src/middlewares/imagemiddleware';
import Blog from '../src/models/Blog';
import { getBlogs } from '../src/controllers/blogController';



dotenv.config();
const dbURI = process.env.MONGODB_URI || '';

 jest.setTimeout(60000);

afterAll(() => {
  closeServer();
});

// beforeAll(async() =>{
//     await mongoose.connect(dbURI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     } as any);
// });


// afterAll(async() =>{
//   await mongoose.connection.close();
// });

describe('test Blog APIs', () =>{
  it('/api/ for 404', async()=>{
      const result  = await supertest(app).get('/api/');
      expect(result.status).toBe(404);
  })
  it('getting a blog by ID', async()=>{
    const show  = await supertest(app).get('/api/blogs/:id');
    expect(show.status).toBe(400);
})
it('Post a Blog', async()=>{
  const show  = await supertest(app).post('/api/blogs');
  expect(show.status).toBe(400);
})
it('delete a Blog', async()=>{
  const show  = await supertest(app).delete('/api/blogs/:id');
  expect(show.status).toBe(400);
})
it('update a Blog', async()=>{
  const show  = await supertest(app).patch('/api/blogs/:id');
  expect(show.status).toBe(400);
})
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
})

describe('comments APIs', () =>{
  it('create a comment', async()=>{
      const result  = await supertest(app).post('/api/blogs/:id/comments');
      expect(result.status).toBe(400);
  })
  it('get a comments', async()=>{
    const result  = await supertest(app).get('/api/blogs/:id/comments');
    expect(result.status).toBe(200);
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
describe('likes APIs', () =>{
  it('create a like', async()=>{
      const result  = await supertest(app).post('/api/blogs/:id/likes');
      expect(result.status).toBe(400);
  })
  it('get a like', async()=>{
    const result  = await supertest(app).post('/api/blogs/:id/likes');
    expect(result.status).toBe(400);
})
})

jest.mock('../src/models/Like', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

jest.mock('../src/models/Like', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

jest.mock('../src/models/Like', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

describe('createLike', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: { like: true, blogId: '123' }, // Mocking request body
    };
    res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }) as unknown as (code: number) => Response<any, Record<string, any>>, // Explicitly defining the type
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should create a like', async () => {
    await createLike(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201); // Expect status 201 to be sent
  });
});


describe('blogValidationSchema', () => {
  it('should validate a valid blog object', () => {
    const validBlog = {
      title: 'Sample Title',
      content: 'Sample Content for the blog post.',
    };
    const validationResult = blogValidationSchema.validate(validBlog);
    expect(validationResult.error).toBeUndefined(); // No error should be present for valid input
  });

  it('should invalidate a blog object with a short title', () => {
    const invalidBlog = {
      title: 'Shot', // Title less than 5 characters
      content: 'Sample Content for the blog post.',
    };
    const validationResult = blogValidationSchema.validate(invalidBlog);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"title" length must be at least 5 characters long');
  });
  

  it('should invalidate a blog object with short content', () => {
    const invalidBlog = {
      title: 'Sample Title',
      content: 'Short', // Content less than 30 characters
    };
    const validationResult = blogValidationSchema.validate(invalidBlog);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"content" length must be at least 30 characters long');
  });

  it('should invalidate a blog object without title', () => {
    const invalidBlog = {
      // No title provided
      content: 'Sample Content for the blog post.',
    };
    const validationResult = blogValidationSchema.validate(invalidBlog);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"title" is required');
  });

  it('should invalidate a blog object without content', () => {
    const invalidBlog = {
      title: 'Sample Title',
      // No content provided
    };
    const validationResult = blogValidationSchema.validate(invalidBlog);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"content" is required');
  });
});

describe('likeSchema', () => {
  it('should validate a valid like object', () => {
    const validLike = {
      like: true,
      blogId: '123456',
    };
    const validationResult = likeSchema.validate(validLike);
    expect(validationResult.error).toBeUndefined(); // No error should be present for valid input
  });

  it('should invalidate a like object without "like" property', () => {
    const invalidLike = {
      blogId: '123456',
    };
    const validationResult = likeSchema.validate(invalidLike);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"like" is required');
  });

  it('should invalidate a like object without "blogId" property', () => {
    const invalidLike = {
      like: true,
    };
    const validationResult = likeSchema.validate(invalidLike);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"blogId" is required');
  });

  it('should invalidate a like object with invalid "like" property', () => {
    const invalidLike = {
      like: 'invalid', // "like" should be a boolean
      blogId: '123456',
    };
    const validationResult = likeSchema.validate(invalidLike);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"like" must be a boolean');
  });

});

describe('messageSchema', () => {
  it('should validate a valid message object', () => {
    const validMessage = {
      content: 'Valid message content with more than 30 characters.',
      sender: 'SenderName',
      receiver: 'ReceiverName',
    };
    const validationResult = messageSchema.validate(validMessage);
    expect(validationResult.error).toBeUndefined(); // No error should be present for valid input
  });

  it('should invalidate a message object with short content', () => {
    const invalidMessage = {
      content: 'Short', // Content less than 30 characters
      sender: 'SenderName',
      receiver: 'ReceiverName',
    };
    const validationResult = messageSchema.validate(invalidMessage);
    expect(validationResult.error).toBeDefined(); // Error should be present for invalid input
    expect(validationResult.error?.message).toContain('"content" length must be at least 30 characters long');
  });
});
describe('getMessageById', () => {
  it('should return a message by id', async () => {
    // Mocking request and response objects
    const req = { params: { id: 'messageId' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Mocking Message.findById to return a message
    const mockMessage = { _id: 'messageId', content: 'Test message' };
    jest.spyOn(Message, 'findById').mockResolvedValueOnce(mockMessage as any);

    // Call the function
    await getMessageById(req, res);

    // Verify that Message.findById is called with the correct message id
    expect(Message.findById).toHaveBeenCalledWith('messageId');

    // Verify that the response contains the expected message
    expect(res.json).toHaveBeenCalledWith(mockMessage);
  });

  it('should handle message not found', async () => {
    // Mocking request and response objects
    const req = { params: { id: 'nonexistentId' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Mocking Message.findById to return null
    jest.spyOn(Message, 'findById').mockResolvedValueOnce(null);

    // Call the function
    await getMessageById(req, res);

    // Verify that Message.findById is called with the correct message id
    expect(Message.findById).toHaveBeenCalledWith('nonexistentId');

    // Verify that the response contains the expected error message
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Message not found' });
  });

  it('should handle internal server error', async () => {
    // Mocking request and response objects
    const req = { params: { id: 'messageId' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Mocking Message.findById to throw an error
    jest.spyOn(Message, 'findById').mockRejectedValueOnce(new Error('Test error'));

    // Call the function
    await getMessageById(req, res);

    // Verify that Message.findById is called with the correct message id
    expect(Message.findById).toHaveBeenCalledWith('messageId');

    // Verify that the response contains the expected error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});


app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully' });
});


describe('getBlogs', () => {
  it('should return a list of blogs when found', async () => {
    // Mocking Blog.find() to return a list of blogs
    const mockBlogs = [{ title: 'Blog 1', content: 'Content 1' }, { title: 'Blog 2', content: 'Content 2' }];
    jest.spyOn(Blog, 'find').mockResolvedValueOnce(mockBlogs as any);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getBlogs(req, res);

    expect(res.status).toHaveBeenCalledWith(201); // Assuming 201 is the correct status code
    expect(res.json).toHaveBeenCalledWith(mockBlogs);
  });

  it('should handle errors and return 500 status code', async () => {
    // Mocking Blog.find() to throw an error
    jest.spyOn(Blog, 'find').mockRejectedValueOnce(new Error('Database error'));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getBlogs(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});


describe('getMessages', () => {
  it('should return a list of messages when found', async () => {
    // Mocking Message.find() to return a list of messages
    const mockMessages = [{ content: 'Message 1' }, { content: 'Message 2' }];
    jest.spyOn(Message, 'find').mockResolvedValueOnce(mockMessages as any);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await getMessages(req, res);

    expect(res.json).toHaveBeenCalledWith(mockMessages);
  });

  it('should handle errors and return 500 status code', async () => {
    // Mocking Message.find() to throw an error
    jest.spyOn(Message, 'find').mockRejectedValueOnce(new Error('Database error'));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});


describe('updateMessage', () => {
  it('should update a message when found', async () => {
    // Mocking Message.findByIdAndUpdate() to return the updated message
    const updatedMessage = { _id: '1', content: 'Updated message' };
    jest.spyOn(Message, 'findByIdAndUpdate').mockResolvedValueOnce(updatedMessage as any);

    const req = { params: { id: '1' }, body: { content: 'Updated message' } } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await updateMessage(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedMessage);
  });

  it('should handle message not found and return 404 status code', async () => {
    // Mocking Message.findByIdAndUpdate() to return null
    jest.spyOn(Message, 'findByIdAndUpdate').mockResolvedValueOnce(null);

    const req = { params: { id: '1' }, body: { content: 'Updated message' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateMessage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Message not found' });
  });

  it('should handle errors and return 500 status code', async () => {
    // Mocking Message.findByIdAndUpdate() to throw an error
    jest.spyOn(Message, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database error'));

    const req = { params: { id: '1' }, body: { content: 'Updated message' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateMessage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});


describe('deleteMessage', () => {
  it('should delete a message when found and return 204 status code', async () => {
    // Mocking Message.findByIdAndDelete() to succeed
    jest.spyOn(Message, 'findByIdAndDelete').mockResolvedValueOnce({} as any);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    await deleteMessage(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it('should handle errors and return 500 status code', async () => {
    // Mocking Message.findByIdAndDelete() to throw an error
    jest.spyOn(Message, 'findByIdAndDelete').mockRejectedValueOnce(new Error('Database error'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteMessage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
