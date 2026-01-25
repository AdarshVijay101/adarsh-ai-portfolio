import SketchCanvas from '@/components/games/sketch-canvas';

export default function SketchGuessPage() {
    return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Draw & AI Guess</h1>
            <SketchCanvas />
        </div>
    );
}
