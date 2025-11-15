# CLIL for Veterinarians

A comprehensive educational website for teaching veterinary English through Content and Language Integrated Learning (CLIL) approach.

## Project Overview

This is a complete multi-page website built with pure HTML5, CSS3, and vanilla JavaScript. The platform provides resources, courses, and materials for both teachers and students in veterinary English education.

## Features

- **10 Complete Pages**: Home, About, Courses, Resources, Research, For Teachers, For Students, Glossary, News/Blog, and Contact
- **4 Learning Modules**: Each with video lessons, reading materials, interactive exercises, quizzes, and image galleries
- **Responsive Design**: Mobile-first approach with breakpoints for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Interactive Elements**: 
  - Mobile hamburger menu
  - Accordion sections
  - Tab navigation
  - Search and filter functionality
  - Quiz system with scoring
  - Image gallery with modal popups
  - Form validation
  - Smooth scrolling
  - Scroll animations

## File Structure

```
clil/
├── index.html              # Home page
├── about.html              # About CLIL and project
├── courses.html            # Course modules overview
├── module-1.html           # Module 1: Veterinary Terminology
├── module-2.html           # Module 2: Animal Anatomy
├── module-3.html           # Module 3: Common Diseases and Treatments
├── module-4.html           # Module 4: Communication in Veterinary Practice
├── resources.html          # Downloadable resources
├── research.html           # Research findings and dissertation info
├── teachers.html           # Resources for teachers
├── students.html           # Resources for students
├── glossary.html           # Veterinary terminology dictionary
├── blog.html               # News and blog posts
├── contact.html            # Contact form and information
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # Main JavaScript file
└── README.md               # This file
```

## Design Specifications

- **Color Scheme**: 
  - Primary Blue: #2563eb
  - Primary Green: #10b981
  - White background with blue and green accents
- **Fonts**: Roboto and Open Sans (Google Fonts)
- **Design Style**: Modern, professional, clean with smooth animations

## Getting Started

1. Open `index.html` in a web browser
2. All pages are linked and ready to use
3. No build process or dependencies required - pure HTML, CSS, and JavaScript

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Features by Page

### Home Page (index.html)
- Hero section with CTA buttons
- Feature cards
- Introduction section
- Stats section
- Latest news preview

### About Page (about.html)
- What is CLIL? (accordion)
- CLIL's role in veterinary education
- Author biography
- Scientific foundation with references

### Courses Page (courses.html)
- 4 module cards with descriptions
- Links to detailed module pages

### Module Pages (module-1.html through module-4.html)
- Video embed section (YouTube iframe)
- Reading text with formatted content
- Interactive exercises
- Quiz with JavaScript functionality
- Image gallery
- Audio player placeholder

### Resources Page (resources.html)
- CLIL lesson plans
- PDF articles
- Presentations
- Audio/video files
- Project results

### Research Page (research.html)
- About the dissertation
- Experimental-testing stages timeline
- Learning effectiveness results with charts (Chart.js)
- List of publications

### For Teachers Page (teachers.html)
- CLIL methodological recommendations (accordion)
- Sample lesson plan template
- Scaffolding techniques visual guide
- Bloom's taxonomy pyramid
- Bilingual assessment methods (tabs)

### For Students Page (students.html)
- Quick links to glossary and tests
- Self-study materials (PDF grid)
- Practice exercises
- Progress tracker

### Glossary Page (glossary.html)
- Search bar with real-time filtering
- Alphabetical navigation (A-Z buttons)
- Category filter dropdown
- Terms with definitions and examples
- Pronunciation buttons

### Blog Page (blog.html)
- Featured post
- Blog grid layout
- Categories sidebar
- Pagination

### Contact Page (contact.html)
- Contact form with validation
- Contact information (email, Telegram, WhatsApp)
- Social media links
- Map placeholder
- FAQ section

## JavaScript Functionality

All JavaScript is in `js/script.js` and includes:
- Mobile menu toggle
- Smooth scrolling
- Accordion functionality
- Tab navigation
- Form validation
- Glossary search and filtering
- Quiz system
- Image gallery modal
- Back to top button
- Scroll animations
- Lazy loading for images

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-blue: #2563eb;
    --primary-green: #10b981;
    /* ... other variables */
}
```

### Content
All content is in HTML files and can be easily edited. Placeholder content is clearly marked and can be replaced with actual content.

### Images
Replace placeholder divs with actual images. Update image paths in HTML files.

## Notes

- YouTube video embeds use placeholder URLs - replace with actual video URLs
- Download buttons are placeholders - connect to actual file downloads
- Map on contact page is a placeholder - add Google Maps embed code
- Audio player buttons are placeholders - implement actual audio playback
- Chart.js is loaded from CDN for research page charts

## Author

Created by Bekniyozova Zarina

## License

This project is created for educational purposes as part of the CLIL for Veterinarians research project.


