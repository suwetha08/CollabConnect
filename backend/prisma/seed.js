const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: hashedPassword,
      skills: ['React', 'JavaScript', 'Node.js', 'UI/UX Design']
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: hashedPassword,
      skills: ['Python', 'Django', 'Machine Learning', 'Data Science']
    }
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Carol Davis',
      email: 'carol@example.com',
      password: hashedPassword,
      skills: ['Vue.js', 'PHP', 'MySQL', 'DevOps']
    }
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'David Wilson',
      email: 'david@example.com',
      password: hashedPassword,
      skills: ['React Native', 'Flutter', 'Mobile Development', 'Firebase']
    }
  });

  console.log('✅ Created 4 sample users');

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      description: 'Building a modern e-commerce platform with React frontend and Node.js backend. Looking for developers to help with payment integration, user authentication, and product catalog management.',
      skillsRequired: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
      teamSize: 4,
      createdBy: user1.id
    }
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'AI Study Assistant',
      description: 'Developing an AI-powered study assistant that helps students organize their learning materials and provides personalized study recommendations using machine learning.',
      skillsRequired: ['Python', 'TensorFlow', 'NLP', 'React'],
      teamSize: 3,
      createdBy: user2.id
    }
  });

  const project3 = await prisma.project.create({
    data: {
      title: 'Social Media Analytics Dashboard',
      description: 'Creating a comprehensive dashboard for social media analytics with real-time data visualization and reporting features for businesses.',
      skillsRequired: ['Vue.js', 'D3.js', 'Python', 'Data Visualization'],
      teamSize: 5,
      createdBy: user3.id
    }
  });

  const project4 = await prisma.project.create({
    data: {
      title: 'Fitness Tracking Mobile App',
      description: 'Building a cross-platform mobile app for fitness tracking with workout plans, nutrition logging, and progress visualization.',
      skillsRequired: ['React Native', 'Firebase', 'UI/UX Design', 'Health APIs'],
      teamSize: 4,
      createdBy: user4.id
    }
  });

  const project5 = await prisma.project.create({
    data: {
      title: 'Blockchain Voting System',
      description: 'Developing a secure blockchain-based voting system for student organizations with transparency and immutability features.',
      skillsRequired: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      teamSize: 3,
      createdBy: user1.id
    }
  });

  const project6 = await prisma.project.create({
    data: {
      title: 'Online Learning Platform',
      description: 'Creating an interactive online learning platform with video streaming, quizzes, progress tracking, and certification system.',
      skillsRequired: ['JavaScript', 'MongoDB', 'Video Streaming', 'AWS'],
      teamSize: 6,
      createdBy: user2.id
    }
  });

  console.log('✅ Created 6 sample projects');

  // Create sample applications
  await prisma.application.create({
    data: {
      userId: user2.id,
      projectId: project1.id,
      status: 'PENDING'
    }
  });

  await prisma.application.create({
    data: {
      userId: user3.id,
      projectId: project1.id,
      status: 'ACCEPTED'
    }
  });

  await prisma.application.create({
    data: {
      userId: user4.id,
      projectId: project2.id,
      status: 'PENDING'
    }
  });

  await prisma.application.create({
    data: {
      userId: user1.id,
      projectId: project3.id,
      status: 'REJECTED'
    }
  });

  console.log('✅ Created sample applications');
  console.log('🎉 Database seeded successfully!');
  
  console.log('\n📊 Summary:');
  console.log('- 4 Users created (password: password123)');
  console.log('- 6 Projects created');
  console.log('- 4 Applications created');
  console.log('\n🔑 Test Login Credentials:');
  console.log('Email: alice@example.com | Password: password123');
  console.log('Email: bob@example.com | Password: password123');
  console.log('Email: carol@example.com | Password: password123');
  console.log('Email: david@example.com | Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });