import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Fundamentals from './components/Fundamentals';
import Stack from './components/Stack';
import Blog from './components/Blog';
import Footer from './components/Footer';

const App = () => {
  return (
    <div id="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Fundamentals />
        <Stack />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default App;
