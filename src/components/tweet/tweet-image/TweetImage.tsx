import React, { useState } from "react";
import { StyledTweetImage } from "./StyledTweetImage";
import ImageModal from "./ImageModal";
import { RemoveIcon } from "../../icon/Icon";
import {
  StyledContainer,
  StyledOverflowContainer,
} from "../../common/Container";
import { StyledRemoveIconContainer } from "./RemoveIconContainer";
import validator from "validator";
import isUUID = validator.isUUID;

interface TweetImageProps {
  src: string;
  alt: string;
  removable?: boolean;
  removeFunction?: () => void;
}
const TweetImage = ({
  src,
  alt,
  removable,
  removeFunction,
}: TweetImageProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <StyledContainer maxHeight={`${100}%`}>
      <StyledOverflowContainer
        maxWidth={"100%"}
        borderRadius={"16px"}
        alignItems={"flex-end"}
      >
        {removable && (
          <StyledRemoveIconContainer>
            <RemoveIcon onClick={removeFunction} />
          </StyledRemoveIconContainer>
        )}
        <StyledTweetImage
          src={isUUID(src) ? process.env.REACT_APP_AWS_BUCKET_ADDRESS + src : src }
          alt={alt}
          onClick={() => setShowModal(true)}
        />
      </StyledOverflowContainer>
      <ImageModal
        show={showModal}
        src={isUUID(src) ? process.env.REACT_APP_AWS_BUCKET_ADDRESS  + src : src }
        alt={alt}
        onClose={() => setShowModal(false)}
      />
    </StyledContainer>
  );
};
export default TweetImage;
