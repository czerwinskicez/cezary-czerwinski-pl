import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

type NewsletterResponse = {
  success: boolean;
  message: string;
};

// Define the subscriber schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribeDate: {
    type: Date,
    default: Date.now,
  },
});

// Use existing model or create a new one
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

// Connect to MongoDB (only once)
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('MONGODB_URI not found in environment variables, using mock DB behavior');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use POST.'
    });
  }

  const { email } = req.body;

  // Basic validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  try {
    // Connect to database (if environment has MongoDB configured)
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
    } else {
      // Mock DB behavior for development without MongoDB
      console.log(`[Development mode] Would subscribe: ${email}`);
      return res.status(200).json({
        success: true,
        message: 'Thank you for subscribing to my newsletter! [Development mode]'
      });
    }

    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to my newsletter. Thank you!'
      });
    }

    // Create a new subscriber
    await Subscriber.create({ email });

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to my newsletter!'
    });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
} 