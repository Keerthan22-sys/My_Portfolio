import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Fundamentals from './components/Fundamentals';
import Stack from './components/Stack';
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
