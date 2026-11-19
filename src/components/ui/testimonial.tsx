import * as React from "react";
import { cn } from "@/lib/utils";

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  companyLogo?: string;
  quote: string;
  authorName: string;
  authorPosition: string;
  authorImage?: string;
  highlightedText?: string;
}

export const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  (
    {
      className,
      companyLogo,
      quote,
      authorName,
      authorPosition,
      authorImage,
      highlightedText,
      ...props
    },
    ref
  ) => {
    const formattedQuote = highlightedText
      ? quote.replace(
          highlightedText,
          `<strong class="font-semibold text-gray-200">${highlightedText}</strong>`
        )
      : quote;

    return (
      <div ref={ref} className={cn("py-16", className)} {...props}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center">
            {companyLogo && (
              <div className="mb-7 h-8 w-32 flex items-center justify-center">
                <img
                  src={companyLogo}
                  alt="Company logo"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <p
              className="max-w-5xl text-balance text-center text-xl sm:text-2xl text-white"
              dangerouslySetInnerHTML={{ __html: `"${formattedQuote}"` }}
            />
            <h5 className="mt-5 font-medium text-gray-300">{authorName}</h5>
            <h5 className="mt-1.5 font-medium text-gray-500">{authorPosition}</h5>
            {authorImage && (
              <div className="mt-5 size-12 rounded-full overflow-hidden bg-gray-700">
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Testimonial.displayName = "Testimonial";
