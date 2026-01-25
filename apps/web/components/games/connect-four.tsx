'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ROWS = 6;
const COLS = 7;

export default function ConnectFourGame() {
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
    const [difficulty, setDifficulty] = useState('agent');
    const [provider, setProvider] = useState('openai');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [gameStatus, setGameStatus] = useState<'active' | 'win' | 'loss' | 'draw'>('active');

    const checkWinner = (currentBoard: number[][], player: number) => {
        // Horizontal
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS - 3; c++) {
                if (currentBoard[r][c] === player && currentBoard[r][c + 1] === player && currentBoard[r][c + 2] === player && currentBoard[r][c + 3] === player) return true;
            }
        }
        // Vertical
        for (let r = 0; r < ROWS - 3; r++) {
            for (let c = 0; c < COLS; c++) {
                if (currentBoard[r][c] === player && currentBoard[r + 1][c] === player && currentBoard[r + 2][c] === player && currentBoard[r + 3][c] === player) return true;
            }
        }
        // Diagonal 1
        for (let r = 0; r < ROWS - 3; r++) {
            for (let c = 0; c < COLS - 3; c++) {
                if (currentBoard[r][c] === player && currentBoard[r + 1][c + 1] === player && currentBoard[r + 2][c + 2] === player && currentBoard[r + 3][c + 3] === player) return true;
            }
        }
        // Diagonal 2
        for (let r = 3; r < ROWS; r++) {
            for (let c = 0; c < COLS - 3; c++) {
                if (currentBoard[r][c] === player && currentBoard[r - 1][c + 1] === player && currentBoard[r - 2][c + 2] === player && currentBoard[r - 3][c + 3] === player) return true;
            }
        }
        return false;
    };

    const handleClick = async (col: number) => {
        if (gameStatus !== 'active' || loading) return;

        let row = -1;
        for (let r = ROWS - 1; r >= 0; r--) {
            if (board[r][col] === 0) {
                row = r;
                break;
            }
        }

        if (row === -1) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = 1;
        setBoard(newBoard);

        if (checkWinner(newBoard, 1)) {
            setGameStatus('win');
            setMessage('🎉 You Won! The AI has been defeated.');
            return;
        }

        setLoading(true);
        setMessage('AI is thinking...');

        try {
            const res = await fetch('http://localhost:8000/games/connect4/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board: newBoard, difficulty, provider })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.comment) setMessage(data.comment);

                if (data.col !== undefined) {
                    // Slight delay for realism
                    setTimeout(() => {
                        let aiRow = -1;
                        for (let r = ROWS - 1; r >= 0; r--) {
                            if (newBoard[r][data.col] === 0) {
                                aiRow = r;
                                break;
                            }
                        }
                        if (aiRow !== -1) {
                            newBoard[aiRow][data.col] = 2;
                            setBoard([...newBoard]);

                            if (checkWinner(newBoard, 2)) {
                                setGameStatus('loss');
                                setMessage('💀 AI Wins! Better luck next time.');
                            }
                        }
                        setLoading(false);
                    }, 500);
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setMessage('AI failed to move.');
            setLoading(false);
        }
    };

    const resetGame = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
        setGameStatus('active');
        setMessage('');
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Connect Four vs AI</CardTitle>
                <CardDescription>Challenge the AI agent.</CardDescription>
                <div className="flex flex-wrap gap-4 items-center mt-2">
                    <div className="flex items-center gap-2">
                        <Label>Mode:</Label>
                        <select
                            className="border rounded p-1 text-sm bg-background"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="easy">Easy (Depth 2)</option>
                            <option value="medium">Medium (Depth 4)</option>
                            <option value="hard">Hard (Minimax)</option>
                            <option value="agent">LLM Agent (Persona)</option>
                        </select>
                    </div>

                    {difficulty === 'agent' && (
                        <div className="flex items-center gap-2">
                            <Label>Agent:</Label>
                            <select
                                className="border rounded p-1 text-sm bg-background"
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                            >
                                <option value="openai">OpenAI (Logic)</option>
                                <option value="grok">Grok (Roast Mode)</option>
                                <option value="gemini">Gemini (Helpful)</option>
                            </select>
                        </div>
                    )}

                    <Button variant="outline" size="sm" onClick={resetGame}>Reset Game</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-8">
                    {/* Holographic Board Container */}
                    <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                        {/* Status Overlay */}
                        {gameStatus !== 'active' && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/60 backdrop-blur-sm animate-in fade-in">
                                <Button size="lg" onClick={resetGame} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 px-8 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                                    Play Again
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            {board.map((row, rIndex) => (
                                <div key={rIndex} className="flex gap-3">
                                    {row.map((cell: number, cIndex: number) => (
                                        <div
                                            key={cIndex}
                                            className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 group cursor-pointer"
                                            onClick={() => handleClick(cIndex)}
                                        >
                                            {/* Grid Slot (Glass inset) */}
                                            <div className="absolute inset-0 rounded-full bg-black/40 shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] border border-white/5" />

                                            {/* Token with Neon Glow */}
                                            <div
                                                className={`
                                                    absolute inset-1 rounded-full transition-all duration-500 transform
                                                    ${cell === 0 ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                                                    ${cell === 1
                                                        ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_25px_rgba(34,211,238,0.6)]'
                                                        : 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-[0_0_25px_rgba(192,132,252,0.6)]'
                                                    }
                                                `}
                                            />

                                            {/* Hover Hint */}
                                            {gameStatus === 'active' && cell === 0 && !loading && (
                                                <div className="absolute inset-2 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/20 transition-colors duration-300" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {message && (
                        <div className="w-full bg-muted/50 p-4 rounded-md border min-h-[100px]">
                            <h4 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-widest">Agent Thoughts</h4>
                            <p className="whitespace-pre-wrap font-mono text-sm">{message}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
