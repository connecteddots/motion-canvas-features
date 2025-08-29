import { Circle, Line, Txt, Layout, makeScene2D, View2D, Shape } from '@motion-canvas/2d';
import { all, Logger, chain, waitFor, useLogger, createRef, Vector2, makeRef, Reference } from '@motion-canvas/core';

import { calculateCirclePoint, calculateCirclePoints } from "../utils/math"
import { PointLabelRef } from '../utils/types';

export default makeScene2D(function* (view) {

  const logger = new Logger();

  const fontFamily = 'Cascadia Code';
  const pointColor = `rgba(227, 209, 14, 0.8)`;
  const circleColor = `rgba(209, 120, 176, 0.8)`;

  const line1 = createRef<Line>();
  const circle = createRef<Circle>();

  const circlePoint = 180;
  const points: Circle[] = [];
  const radius = 250;
  const center = { x: 0, y: 0 };

  view.fill('rgba(79, 56, 79, 0.8)');

  // add origin
  const p0 = addPointWithLabel(view, pointColor, fontFamily, center);

  // add point 1
  const p1 = addPointWithLabel(view, pointColor, fontFamily, { x: center.x + radius, y: center.y });

  // add circle points
  const circlePoints = calculateCirclePoints(center, radius, Array.from({ length: circlePoint }, (_, x) => x * (360 / circlePoint)));

  view.add(circlePoints.map((p, i) => <Circle ref={makeRef(points, i)} fill={circleColor} width={3} height={3} x={p.x} y={p.y} opacity={0} />))

  view.add(<Circle ref={circle} fill={circleColor} width={radius * 2} height={radius * 2} x={center.x} y={center.y} opacity={0} />)

  view.add(<Line ref={line1} points={[[center.x, center.y], [radius, center.y]]} stroke={circleColor} lineWidth={4} endArrow arrowSize={10} opacity={0} />);

  console.log(typeof p0);

  yield* chain(
    all((p0.node as any).opacity(0.1, 0.2).to(1, .3), (p0.label as any).opacity(0.1, 0.2).to(1, .3)),
    waitFor(.5),
    all((p1.node as any).opacity(0.1, 0.2).to(1, .3), (p1.label as any).opacity(0.1, 0.2).to(1, .3)),
    waitFor(.5),
    line1().opacity(0.1, 0.2).to(1, .3),
    waitFor(.5),
    chain(...points.map(p => p.opacity(1, .005))),
    waitFor(.5),
    circle().opacity(0.1, .005).to(.7, .5)
  )

});

function addPointWithLabel(view: View2D, pointColor: string, fontFamily: string, center: { x: number; y: number; }): PointLabelRef {
  const result: PointLabelRef = { node: null, label: null };

  view.add(<Circle ref={makeRef(result, "node")}
    fill={pointColor}
    x={center.x}
    y={center.y}
    height={10}
    width={10}
    opacity={0} />);

  view.add(<Txt fontFamily={fontFamily}
    ref={makeRef(result, 'label')}
    fontSize={20} fontWeight={600}
    x={center.x + 20} y={center.y - 20}
    opacity={0}
    fill={pointColor}>({center.x.toString()},{center.y.toString()})</Txt>);

  return result;
}
