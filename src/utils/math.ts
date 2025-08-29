interface Point {
    x: number;
    y: number;
}

export function calculateCirclePoint(
    center: Point,
    radius: number,
    angleDegrees: number
): Point {
    // Convert degrees to radians
    const angleRadians = angleDegrees * Math.PI / 180;

    // Calculate point coordinates
    const x = center.x + radius * Math.cos(angleRadians);
    const y = center.y + radius * Math.sin(angleRadians);

    return {
        x: parseFloat(x.toFixed(6)), // Round to 6 decimal places for precision
        y: parseFloat(y.toFixed(6))
    };
}

// Function to calculate multiple points at once
export function calculateCirclePoints(
    center: Point,
    radius: number,
    anglesDegrees: number[]
): Point[] {
    return anglesDegrees.map(angle =>
        calculateCirclePoint(center, radius, angle)
    );
}