import {SVG_NS} from '../settings';

export default class Board {
constructor(width, height) {
  this.width = width;
  this.height = height;
}
render(svg) {
  let rect = document.createElementNS(SVG_NS, 'rect');
  rect.setAttributeNS(null, 'width', this.width);
  rect.setAttributeNS(null, 'height', this.height);
  rect.setAttributeNS(null, 'fill', '#4b9d4e');
  rect.setAttributeNS(null,'stroke', '#0e2c89');
  rect.setAttributeNS(null,'stroke-width', '6');
  
  svg.appendChild(rect);
  
  let line = document.createElementNS(SVG_NS, 'line');
  line.setAttributeNS(null, 'stroke-dasharray', '20,15');
  line.setAttributeNS(null, 'stroke', '#0e2c89');
  line.setAttributeNS(null, 'stroke-width', '4');
  line.setAttributeNS(null, 'x1', this.width/2);
  line.setAttributeNS(null, 'y1', '0');
  line.setAttributeNS(null, 'x2', this.width/2);
  line.setAttributeNS(null, 'y2', this.height);
  

  svg.appendChild(line);
  
  
  
}
}