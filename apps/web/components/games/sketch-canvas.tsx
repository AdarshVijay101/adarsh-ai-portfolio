'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SketchCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [guess, setGuess] = useState('');
    const [loading, setLoading] = useState(false);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        setGuess('');
    };

    const submitDrawing = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const image = canvas.toDataURL('image/png');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/games/sketch/guess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image, provider: 'openai' })
            });
            const data = await res.json();
            setGuess(data.guess);
        } catch (err) {
            console.error(err);
            setGuess('Error guessing drawing.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>AI Sketch Guessing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={400}
                    className="border border-white/20 bg-[#0a0a0a] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-crosshair touch-none select-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
                <div className="flex gap-4 w-full justify-center">
                    <Button
                        variant="outline"
                        onClick={clearCanvas}
                        className="border-white/20 hover:bg-white/10 text-white"
                    >
                        Clear Canvas
                    </Button>
                    <Button
                        onClick={submitDrawing}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-500 text-white min-w-[140px] shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                    >
                        {loading ? 'Analyzing...' : 'Guess Drawing'}
                    </Button>
                </div>
                {guess && <div className="text-xl font-bold text-emerald-500 mt-4">{guess}</div>}
            </CardContent>
        </Card>
    );
}
