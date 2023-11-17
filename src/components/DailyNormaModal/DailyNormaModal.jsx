import React, { useState, useEffect, useCallback } from 'react';
import { Box } from 'components/common/Container/Container.styled';
import FormInput from 'components/common/FormInput/FormInput';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon/Icon';
import Modal from 'components/common/Modal';
import Loader from 'components/common/Loader';

import {
  ModalHeader,
  CloseButton,
  ColorTextNormal,
  ItemeGender,
  TiltleGender,
  VolumeNorm,
  TextNormal,
  CalculateYourRate,
  FrameParent,
  FrameItem,
  YourWeight,
  YourTime,
  Required,
  L,
  Write,
  SaveWrapper,
} from './DailyNormaModal.styled';

const DailyNormaModal = ({ setModalOpen }) => {
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [calculatedWaterAmount, setCalculatedWaterAmount] = useState(0);
  const [drankWaterAmount, setDrankWaterAmount] = useState(0);
  const [selectedGender, setSelectedGender] = useState('forGirl');
  const [isLoader, setIsLoader] = useState(false);
  const [isSendFormDane, setIsSendFormDane] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    const formData = {
      gender: selectedGender,
      weight,
      activityTime,
      calculatedWaterAmount,
      drankWaterAmount,
    };

    console.log('Data to be sent:', formData);
    setIsLoader(true);

    setTimeout(() => {
      setIsLoader(false);
      setIsSendFormDane(true);
    }, 2000);

    const backendSuccess = true;
    if (backendSuccess) {
    } else {
      console.error('Failed to save data. Please try again.');
    }
  };

  const handleWeightChange = event => {
    setWeight(event.target.value);
  };
  const handleActivityTimeChange = event => {
    setActivityTime(event.target.value);
  };
  const handleDrankWaterChange = event => {
    setDrankWaterAmount(event.target.value);
  };

  const calculateWaterAmount = useCallback(() => {
    const weightCoefficient = selectedGender === 'forGirl' ? 0.03 : 0.04;
    const timeCoefficient = selectedGender === 'forGirl' ? 0.4 : 0.6;
    const calculatedAmount =
      weight * weightCoefficient + activityTime * timeCoefficient;
    setCalculatedWaterAmount(calculatedAmount.toFixed(2));
  }, [weight, activityTime, selectedGender]);

  useEffect(() => {
    calculateWaterAmount();
  }, [calculateWaterAmount]);

  useEffect(() => {
    if (isSendFormDane) {
      setTimeout(() => {
        closeModal();
      }, 6000);
    }
  });

  return (
    <Modal onClose={closeModal}>
      <Box>
        {!isSendFormDane && (
          <>
            {' '}
            <ModalHeader>
              My daily norma
              <CloseButton onClick={closeModal}>
                <Icon
                  name="plus"
                  width={24}
                  height={24}
                  fill="#ffffff00"
                  stroke="#000000"
                  className="icon"
                />
              </CloseButton>
            </ModalHeader>
            <TiltleGender>
              <ItemeGender>For girl:</ItemeGender>
              <ColorTextNormal>V=(M*0.03) + (T*0.4)</ColorTextNormal>
              <ItemeGender>For man:</ItemeGender>
              <ColorTextNormal>V=(M*0.04) + (T*0.6)</ColorTextNormal>
            </TiltleGender>
            <VolumeNorm>
              <TextNormal>
                *V is the volume of the water norm in liters per day, M is your
                body weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </TextNormal>
            </VolumeNorm>
            <CalculateYourRate>Calculate your rate:</CalculateYourRate>
            <FrameParent>
              <FrameItem
                type="radio"
                id="forGirl"
                name="gender"
                checked={selectedGender === 'forGirl'}
                onChange={() => setSelectedGender('forGirl')}
              />
              <>For girl</>
              <FrameItem
                type="radio"
                id="forMan"
                name="gender"
                checked={selectedGender === 'forMan'}
                onChange={() => setSelectedGender('forMan')}
              />
              <>For man</>
            </FrameParent>
            <div className="wrap">
              <YourWeight>
                <>Your weight in kilograms:</>
              </YourWeight>
              <FormInput
                inputType="dailyNorma"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div className="wrap">
              <YourTime>
                <p>
                  The time of active participation in sports or other activities
                  with a high physical. load:
                </p>
              </YourTime>
              <FormInput
                inputType="dailyNorma"
                value={activityTime}
                onChange={handleActivityTimeChange}
              />
              <Required>
                <p>
                  The required amount of water in liters per day:
                  <L>{calculatedWaterAmount} L</L>
                </p>
              </Required>
            </div>
            <Write>
              <p>Write down how much water you will drink:</p>
            </Write>
            <FormInput
              inputType="dailyNorma"
              value={drankWaterAmount}
              onChange={handleDrankWaterChange}
            />
            <SaveWrapper>
              <Button onClick={handleSave}>Save</Button>
            </SaveWrapper>
          </>
        )}

        {isLoader && <Loader />}
        {isSendFormDane && <div>Form send</div>}
      </Box>
    </Modal>
  );
};

export default DailyNormaModal;
