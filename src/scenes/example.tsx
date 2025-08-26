import { Circle, Line, Txt, Img, makeScene2D } from '@motion-canvas/2d';
import { all, waitFor, useLogger, createRef } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const logger = useLogger();

  const markerCount = 5;
  const xAxisExtend = 50;
  const startX = -500;
  const endX = 500;
  const spacing = (endX - startX) / (markerCount - 1);

  const lineRef = createRef<Line>();
  const xPoints: number[] = [];
  const markerRefs = Array.from({ length: markerCount }, () => createRef<Circle>());
  const labelRefs = Array.from({ length: markerCount }, () => createRef<Txt>());

  view.add(
    <Line
      ref={lineRef}
      points={[
        [startX - xAxisExtend, 0],
        [endX + xAxisExtend, 0],
      ]}
      stroke={'lightseagreen'}
      lineWidth={8}
      radius={40}
      startArrow
      endArrow
      arrowSize={20}
    />
  );

  for (let i = 0; i < markerCount; i++) {
    const x = startX + i * spacing;

    xPoints.push(x);
    view.add(
      <Circle
        ref={markerRefs[i]}
        x={x}
        y={0}
        width={20}
        height={20}
        fill={'#fdbb2d'}
        scale={0}
      />
    );

    view.add(
      <Txt
        ref={labelRefs[i]}
        text={`${i + 1}`}
        x={x}
        y={-30}
        fontSize={24}
        fill={'yellow'}
        opacity={0}
      />
    );

    yield* waitFor(0.2);
    yield* all(
      markerRefs[i]().scale(1, 0.5),
      labelRefs[i]().opacity(1, 0.5)
    );

    for (let index = 0; index <= i; index++) {
      logger.info(`${i},${index},${-100 - i * 100}`)

      const ref = createRef<Img>();
      yield view.add(
        <Img
          x={x}
          y={-100 - index * 100}
          ref={ref}
          src="../../assets/black rabbit standing.svg"
          width={50}
          radius={50}
        />,
      );

      yield all(
        ref().size([100, 100], 1).to([50, null], 1),
        ref().radius(50, 1).to(20, 1),
        // ref().alpha(0, 1).to(1, 1),
      );
      yield* waitFor(0.5);
    }


  }

  // Animate markers and labels
  // for (let i = 0; i < markerCount; i++) {
  //   yield* waitFor(0.2);
  //   yield* all(
  //     markerRefs[i]().scale(1, 0.5),
  //     labelRefs[i]().opacity(1, 0.5)
  //   );
  // }

  function getSemicircleControlPoint(p1: [number, number], p2: [number, number]): [number, number] {
    const centerX = (p1[0] + p2[0]) / 2;
    const radius = Math.abs(p2[0] - p1[0]) / 2;
    const direction = p1[1] === p2[1] ? -1 : Math.sign(p2[1] - p1[1]); // Curve upward if horizontal

    return [centerX, p1[1] + direction * radius];
  }


  for (let i = 0; i < markerCount - 1; i++) {
    // const element = array[i];
    const line = (<Line
      points={[
        [xPoints[i], 5],
        getSemicircleControlPoint([xPoints[i], 5], [xPoints[i + 1], 5]),
        [xPoints[i + 1], 5],
      ]}
      stroke={'red'}
      lineWidth={7}
      radius={25}
      endArrow
      arrowSize={20}
    />);

    console.log(xPoints[i], xPoints[i + 1]);

    view.add(line);

    // yield* waitUntil('click');


  }
});