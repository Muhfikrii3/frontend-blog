import { IKImage } from "imagekitio-react";
import { imageUrl } from "../../services/api";

interface ImageProps {
	src: string;
	className?: string;
	w?: string | number;
	h?: string | number;
	alt: string;
}

const Image = ({ src, className, w, h, alt }: ImageProps) => {
	return (
		<IKImage
			urlEndpoint={imageUrl}
			path={src}
			className={className}
			loading="lazy"
			lqip={{ active: true, quality: 20 }}
			alt={alt}
			width={w}
			height={h}
			transformation={[
				{
					width: w,
					height: h,
				},
			]}
		/>
	);
};

export default Image;
