import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#002147] text-zinc-100 py-4 border-t-2 border-[#FFD100]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-2 md:mb-0">
                        <h3 className="text-sm font-semibold text-[#FFD100]">My Articles</h3>
                        <p className="text-xs text-zinc-300">Insights, ideas, and stories crafted with purpose</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/about" className="text-xs text-zinc-300 hover:text-[#FFD100] transition-colors">About Me</Link>
                        <a href="mailto:gacadaaron@gmail.com" className="text-xs text-zinc-300 hover:text-[#FFD100] transition-colors">Contact</a>
                        <a href="https://github.com/DozaPat" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-300 hover:text-[#FFD100] transition-colors">GitHub</a>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-900/50 text-center text-xs text-zinc-400">
                    <p>&copy; 2026 Gacad, Marc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;