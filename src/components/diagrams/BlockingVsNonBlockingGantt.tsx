import Mermaid from '@/components/Mermaid.tsx';

export default function BlockingVsNonBlockingGantt() {
    return (
        <Mermaid chart={`flowchart TD
    A[Blocking vs Non-Blocking Comparison]
    
    A --> B[Blocking: 420ms total]
    A --> C[Non-Blocking: 20ms response]
    
    B --> D[Process: 10ms]
    D --> E[Track 1: 100ms]
    E --> F[Track 2: 100ms]
    F --> G[Track 3: 100ms]
    G --> H[Track 4: 100ms]
    H --> I[Select: 5ms]
    I --> J[Return: 5ms]
    
    C --> K[Process: 10ms]
    K --> L[Select: 5ms]
    L --> M[Return: 5ms]
    
    K --> N[Async Track 1]
    K --> O[Async Track 2]
    K --> P[Async Track 3]
    K --> Q[Async Track 4]
    
    style A fill:#6b7280,color:#ffffff
    style B fill:#f87171ff,color:#ffffff
    style C fill:#4ade80ff,color:#000000
    style D,E,F,G,H,I,J fill:#f87171ff,color:#ffffff
    style K,L,M fill:#4ade80ff,color:#000000
    style N,O,P,Q fill:#4ade80ff,color:#000000
`} />
    );
}