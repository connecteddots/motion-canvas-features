import { Circle, Txt } from "@motion-canvas/2d";
import { Reference } from "@motion-canvas/core";

export interface PointLabelRef {
    node: Reference<Circle>,
    label: Reference<Txt>
}