import React from 'react';
import { FaRegStar, FaUsers, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

interface CourseDetailsProps {
  language: string;
  rating: number;
  ratingCount: number;
  learners: number;
  whatYouWillLearn: string;
  courseIncludes: string;
  courseContent: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  language,
  rating,
  ratingCount,
  learners,
  whatYouWillLearn,
  courseIncludes,
  courseContent
}) => {
  return (
    <div className="right-section">
      <div className="course-info">
        <p><FaBookOpen /> Language: {language}</p>
        <p><FaRegStar /> Rating: {rating} ({ratingCount} reviews)</p>
        <p><FaUsers /> Learners: {learners}</p>
      </div>

      <h3>What You&apos;ll Learn</h3>
      <ul className="bullet-list">
        {whatYouWillLearn.split('|').map((point, index) => (
          <li key={index}><FaCheckCircle className="icon" /> {point}</li>
        ))}
      </ul>

      <h3>This Course Includes</h3>
      <ul className="bullet-list">
        {courseIncludes.split('|').map((include, index) => (
          <li key={index}><FaCheckCircle className="icon" /> {include}</li>
        ))}
      </ul>

      <h3>Course Content</h3>
      <ul className="bullet-list">
        {courseContent.split('|').map((chapter, index) => (
          <li key={index}><FaBookOpen className="icon" /> {chapter}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;