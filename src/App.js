import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Fundamentals from './components/Fundamentals';
import Stack from './components/Stack';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Fundamentals />
    <Stack />
    <Blog />
  </>
);

const App = () => {
  return (
    <div id="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
