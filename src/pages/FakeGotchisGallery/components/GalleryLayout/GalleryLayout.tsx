import { useState } from 'react';

import { Masonry } from '@mui/lab';

import { FakeGotchi } from 'shared/models';
import { CustomModal } from 'components/CustomModal/CustomModal';
import { FakeGotchisIcon } from 'components/Icons/Icons';

import { GalleryPreview } from '../GalleryPreview/GalleryPreview';
import { styles } from './styles';

export function GalleryLayout({ items }: { items: FakeGotchi[] }) {
  const classes = styles();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedFakeGotchi, setSelectedFakeGotchi] = useState<FakeGotchi>();

  const onFakeGotchiClick = (fakeGotchi: FakeGotchi) => {
    setSelectedFakeGotchi(fakeGotchi);
    setModalOpen(true);
  };

  return (
    <>
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={0.5} className={classes.fakeGotchiGalleryList}>
        {items.map((item: FakeGotchi, index: number) => (
          <div className={classes.fakeGotchiGalleryItem} key={index}>
            <div className={classes.fakeGotchiGalleryItemDesc} onClick={() => onFakeGotchiClick(item)}>
              <img src={`https://arweave.net/${item.thumbnailHash}`} alt={item.name} loading='lazy' />
            </div>
            <div className={classes.fakeGotchiGalleryLoader}>
              <FakeGotchisIcon height={60} width={60} />
            </div>
          </div>
        ))}
      </Masonry>

      {selectedFakeGotchi && (
        <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <GalleryPreview fakeGotchi={selectedFakeGotchi} />
        </CustomModal>
      )}
    </>
  );
}
