import Mermaid from '@/components/Mermaid.tsx';

export default function RateLimitingFlowchart() {
    return (
        <Mermaid chart={`flowchart LR
    subgraph Input[4 Requests Arrive]
        R1[Request 1]
        R2[Request 2]
        R3[Request 3]
        R4[Request 4]
    end
    
    subgraph Slots[3 Available Slots]
        S1[Slot 1]
        S2[Slot 2] 
        S3[Slot 3]
    end
    
    subgraph Active[Active Processing]
        G1[Goroutine 1]
        G2[Goroutine 2]
        G3[Goroutine 3]
    end
    
    R1 --> S1 --> G1
    R2 --> S2 --> G2
    R3 --> S3 --> G3
    R4 -.->|BLOCKED| Wait[Waiting Area]
    
    style Input fill:#e2e8f0,color:#000000
    style Slots fill:#4ade80ff,color:#000000  
    style Active fill:#93c5fd,color:#000000
    style Wait fill:#f87171ff,color:#ffffff
`} />
    );
}