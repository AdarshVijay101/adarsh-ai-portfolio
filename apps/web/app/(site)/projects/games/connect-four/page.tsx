import ConnectFourGame from '@/components/games/connect-four';

export default function ConnectFourPage() {
    return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Connect Four vs AI</h1>
            <ConnectFourGame />
        </div>
    );
}
