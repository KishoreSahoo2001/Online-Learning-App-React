export interface Article {
    id: number;
    title: string;
    content: string;
    price: number;
    tags: string;
    image: string;
    author_name: string;
    language: string;
    rating: number;
    rating_count: number;
    learners: number;
    what_you_will_learn: string[];
    course_includes: string[];
    course_content: string[];
    book_image: string;
    purchased: boolean;
  }  