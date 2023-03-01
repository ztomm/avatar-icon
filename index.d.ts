export interface avatarIconOptions {
	size?            : number,
	density?         : number,
	colorRange?      : number,
	brightness?      : number,
	contrast?        : number,
	backgroundColor? : string,
	fillRatio?       : number,
	rectangleRatio?  : number,
	triangleRatio?   : number,
	circleRatio?     : number,
	returnType?      : string,
}

declare function avatarIcon(options?: avatarIconOptions): string;

export default avatarIcon;
