// app/blogs/[slug]/page.tsx

'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../../components/MainLayout';
import { Clock, User } from 'lucide-react';

// --- Data Structure ---
interface BlogPost {
  title: string;
  author: string;
  slug: string;
  imagePath: string;
  content: string;
}

// --- Placeholder Blog Data (Synchronized) ---
const blogPosts: BlogPost[] = [
  // FIX: SLUG and TITLE are now synchronized with the listing page
  {
    title: "How Clarity of Mind Transformed My UI & Development Journey",
    author: "Kenneth Obul",
    slug: "clarity-of-mind-in-ui-development",
    imagePath: "/images/blog_1.jpeg",
    content: `
My journey into coding began in September 2022 — a month that looked ordinary from the outside, yet it silently marked the beginning of one of the hardest and most transformative chapters of my life.
  
When I opened my first programming textbook, I felt hopeful… excited… curious. But that excitement faded quickly. I was handed Objective-C as my first language — a language that felt like it was intentionally built to break beginners. The syntax confused me, the logic felt impossible, and every time I thought I understood a concept, it slipped through my fingers like sand.
  
Then came the first CAT.
  
02 out of 30.
  
I remember staring at that paper, my heart sinking slowly, painfully. The class was leaving the room, chatting and laughing, but I sat there in silence, feeling as though every dream I had about tech had been crushed in one moment. I questioned myself so much that week.
  
“Maybe I’m not made for this.”
“Maybe coding is not for people like me.”
“Maybe this journey was a mistake.”
  
There was a week — a full week — where I could not write a single line of code by myself. Not one. Every time I opened my laptop, I froze. My mind went blank. I felt helpless, ashamed, and honestly… broken.
  
But there is something powerful that happens when a person hits the lowest point:  
**You stop fighting with your weakness, and you start fighting for your future.**
  
Something inside me refused to give up.
  
Slowly, painfully, I picked myself up again. I started watching beginner tutorials, typing one line of code at a time, repeating simple exercises over and over. I celebrated small wins — not because they were impressive, but because they meant I was moving again.
  
And then something changed.
  
One day, I understood a concept without help.  
Another day, my code ran on the first try.  
Another day, I built something small — but I built it myself.
  
Piece by piece, confidence returned.
  
From 02/30, I learned one of the greatest lessons of my life:  
**Failure is only final when you stop showing up.**  
As long as you keep trying — even slowly, even silently — the future is still yours.
  
Today, when I look back at that frightened version of myself, sitting with that failed paper, I don’t feel shame anymore. I feel gratitude. That moment broke me, but it also built me. It taught me perseverance, humility, discipline, and the courage to rise again.
  
If you are reading this and your coding journey feels heavy…  
If tutorials overwhelm you…  
If your code keeps breaking…  
If you feel like giving up…
  
Please hear this: **You are not alone.**
  
Great developers are not born.  
They are forged in failure, strengthened by persistence, and shaped by the days they chose to keep going when everything looked impossible.
  
This is not the story of someone who succeeded instantly.  
This is the story of someone who refused to quit.
  
And if you refuse to quit too, your story will be just as beautiful — maybe even more.
  
`
  }
,  
// ... (Keep the rest of your blogPosts data here, as it is correct)
{
  title: "How Coding Gave Me Purpose During Difficult Moments of My Life",
  author: "Kenneth Obul",
  slug: "coding-gave-me-purpose",
  imagePath: "/images/blog_2.jpeg",
  content: `
There are moments in life when darkness does not arrive suddenly. It creeps in quietly — a slow heaviness, a feeling of drifting, an unspoken sense that the world around you continues to move while you remain still. In those moments, purpose becomes a luxury, and motivation becomes a distant echo.

During one of those seasons, I discovered coding.

I did not approach it like a scholar seeking mastery. I approached it like a drowning man searching for air. The logic, the structure, the discipline — all of it gave my restless mind something steady to hold. Coding did not simply teach me how to build software; it taught me how to build myself again.

Every bug I solved reminded me that confusion can be temporary.  
Every line of code whispered that progress is created, not gifted.  
Every small success revived a part of me that had been quietly fading.

I began to understand something profound:  
**Purpose is not found. Purpose is crafted.**  

In the quiet hours of the night, when the world was asleep and my thoughts were loud, coding became my sanctuary. It gave me a reason to sit up. A reason to try. A reason to believe that tomorrow could be better than today.

What began as a skill slowly became a philosophy:  
Order can emerge from chaos.  
Meaning can grow from effort.  
Strength can rise from struggle.

Coding did not save me in a dramatic, cinematic way.  
It saved me gently — line by line, concept by concept, failure by failure.

And in that slow reconstruction of my life, I discovered that sometimes the things we learn are not just tools for work, but instruments for healing.

This is why coding became more than a career path for me.  
It became a mirror that reflected who I could be when I refused to surrender.

If you are in a difficult place, let me tell you this:  
**Purpose is closer than it feels.**  
Sometimes it hides in the very thing you are afraid to try.  
Sometimes, all it needs is a single step — even a trembling one.

My journey began when I stopped waiting for purpose to find me…  
and started building it.`
}
,
{
  title: "Why Becoming a Developer Became the Turning Point of My Entire Future",
  author: "Kenneth Obul",
  slug: "developer-turned-my-future",
  imagePath: "/images/blog_3.jpeg",
  content: `
In every person’s life, there are decisions that do not appear monumental at first. They arrive quietly, unnoticed, like seeds carried by the wind. Only later do we realize they contained an entire forest.

Choosing to become a developer was one of those seeds in my life.

I began not with confidence, but with hesitation — carrying more questions than answers. I was not born with a natural gift for logic. I did not understand everything quickly. My victories were small, and my failures were many. And yet, every step forward felt like I was rewriting my destiny.

What I discovered was astonishing:  
**Coding changes a person long before it changes their career.**

It alters how you think.  
It sharpens how you observe.  
It teaches you that every problem, no matter how complex, holds a solution somewhere within its chaos.

Slowly, I learned that software development is not just about technology —  
it is about transforming the mind into an instrument of creation.

The turning point in my future came when I realized that being a developer gives you the ability to shape the world.  
To take an idea and give it life.  
To turn imagination into something real.  

It is a power that humbles you. And a responsibility that elevates you.

For me, this journey was not only professional growth — it was personal awakening. It taught me that the limits I once believed in were illusions created by fear. Each project, each challenge, each breakthrough became proof that I could build more than apps:

I could build a future worthy of my effort.  
A future where my skills mattered.  
A future I was no longer afraid to pursue.

And so coding became a turning point — not because it changed the world around me, but because it changed the person within me.

If you ever doubt the direction of your own life, remember this:  
Sometimes the path you fear holds the version of you that you have always hoped to become.`
}
,
{
  title: "How I Turned Fear, Doubt, and Failure Into Motivation to Grow in Tech",
  author: "Kenneth Obul",
  slug: "turning-fear-into-growth",
  imagePath: "/images/blog_4.jpeg",
  content: `
Fear, doubt, and failure — these are words many people run from. But in my journey through tech, I learned something unexpected: these were not my enemies. They were my teachers.

Fear taught me humility.  
Doubt taught me curiosity.  
Failure taught me resilience.

There were nights I sat in front of my laptop staring at the same error for hours, feeling the weight of inadequacy sitting heavily on my shoulders. There were moments when self–belief trembled so violently that giving up seemed easier than continuing.

But I began to realize something profound:  
**Growth does not happen in the absence of fear — it happens in the presence of it.**

Every time fear whispered that I was not capable, I chose to move an inch forward.  
Every time doubt claimed I was not enough, I opened another tutorial.  
Every time failure knocked me down, I stood up one more time than it pushed me.

Slowly, these struggles stopped being obstacles and became fuel.

I understood that fear is simply the sign that you are stepping into a new space — a bigger version of yourself. Doubt is the mind checking whether what you are doing truly matters. And failure is the fire in which character is forged.

And so I kept going.

I turned anxiety into awareness.  
I turned confusion into discipline.  
I turned mistakes into wisdom.

With time, something remarkable happened:  
The things that once scared me became the very things that strengthened me.

Through this process, I learned the greatest truth of my journey:  
**Mastery is not the absence of struggle. It is the transformation of struggle into strength.**

If you are walking your own path in tech — stumbling, learning, breaking, rebuilding — let this be your reminder:

Your fear is not a sign to stop.  
Your doubt is not a sign to retreat.  
Your failures are not signs of weakness.

They are the raw materials from which every great developer is shaped.

And you, too, are becoming one.`
}
];

// --- Helper: Get Post ---
const getPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};

// --- Helper: Split Content into Paragraph Arrays (New Logic) ---
const splitContentIntoParagraphs = (content: string): string[] => {
  // 1. Split by double newlines (\n\n) which typically denotes a new paragraph.
  return content.trim().split(/\n\s*\n/).filter(p => p.trim() !== '');
};

// --- Helper: Format Paragraph for HTML (New Logic) ---
const formatParagraph = (paragraph: string) => {
    // 1. Replace single newlines (\n) within a paragraph with a break tag
    let html = paragraph.replace(/\n/g, '<br />');

    // 2. Simple Markdown for Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return html;
};

// --- Blog Content Card Component (Reusing the Card style) ---
const BlogContentCard: React.FC<{ htmlContent: string, delay: number }> = ({ htmlContent, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="bg-[#202020] rounded-3xl p-6 md:p-10 shadow-lg text-lg text-gray-300 prose prose-invert max-w-none"
        >
            {/* The main content paragraph */}
            <p 
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
        </motion.div>
    );
};


// --- Page Component ---
const SingleBlogPostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <MainLayout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <h1 className="text-4xl text-white">404 - Post Not Found</h1>
          <p className="text-gray-400 mt-4">The blog post you are looking for does not exist.</p>
        </motion.div>
      </MainLayout>
    );
  }

  // 1. Split content into separate paragraphs
  const contentParagraphs = splitContentIntoParagraphs(post.content);

  // compute read time
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <MainLayout>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col space-y-8"
      >
        {/* 1. Header Card (Title, Author, Read Time) */}
        <div className="bg-[#202020] rounded-3xl p-6 md:p-10 shadow-lg">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span className="flex items-center">
              <User size={16} className="mr-1 text-blue-400" /> By {post.author}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-1 text-blue-400" /> {readingTime} min read
            </span>
          </div>
        </div>

        {/* 2. Featured image Card */}
        <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <Image src={post.imagePath} alt={post.title} fill className="object-cover" />
        </div>

        {/* 3. Content - NOW A STACK OF CARDS (The new UI/UX) */}
        {contentParagraphs.map((paragraph, index) => (
            <BlogContentCard
                key={index}
                // Increase the delay slightly for a nice staggered effect as the user scrolls
                delay={0.1 * index} 
                htmlContent={formatParagraph(paragraph)}
            />
        ))}

        {/* 4. Final CTA Card */}
        <div className="bg-[#202020] rounded-3xl p-6 md:p-10 shadow-lg text-lg text-gray-300 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Next Steps</h2>
          <p>
            If this journey of perseverance and purpose resonated with you, the next step is yours. 
            Ready to transform your own ideas into real-world code? Explore my &quot;Works&quot; 
            section to see these principles in action, or connect with me to start building your future project.
          </p>
        </div>
        
        {/* ProfileCard and LetsTalkCard are handled by MainLayout */}
      </motion.div>
    </MainLayout>
  );
};

export default SingleBlogPostPage;