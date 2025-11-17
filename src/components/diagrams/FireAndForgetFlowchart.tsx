import Mermaid from '@/components/Mermaid.tsx';

export default function FireAndForgetFlowchart() {
    return (
        <Mermaid chart={`flowchart TD
    A[Receive Request] --> B[Process Request]
    B --> C[Fire Tracking Events]
    B --> D[Select Winner]
    D --> E[Return Response]
    
    C --> F[Async: Track Item 1]
    C --> G[Async: Track Item 2] 
    C --> H[Async: Track Item 3]
    C --> I[Async: Track Item 4]
    
    style A,B,D,E fill:#f87171ff,color:#ffffff
    style C fill:#60a5fa,color:#000000
    style F,G,H,I fill:#4ade80ff,color:#000000
`} />
    );
}