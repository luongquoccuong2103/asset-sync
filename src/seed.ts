import { Location } from './asset/entities/location.entity';
import { AppDataSource } from './data-source';

async function seed() {
  await AppDataSource.initialize();

  const locationRepository = AppDataSource.getRepository(Location);

  const locations = [
    { id: 1, name: 'Da Nang', organization: 'PNS', status: 'actived' },
    { id: 2, name: 'Ha Noi', organization: 'PNS', status: 'unactive' },
    { id: 3, name: 'Ho Chi Minh', organization: 'PNS', status: 'actived' },
    { id: 4, name: 'Nha Trang', organization: 'PLJ', status: 'actived' },
    { id: 5, name: 'Can Tho', organization: 'PLJ', status: 'actived' },
  ];

  for (const location of locations) {
    const existingLocation = await locationRepository.findOneBy({
      id: location.id,
    });
    if (!existingLocation) {
      await locationRepository.save(location);
    } else {
      console.log(`Location with id ${location.id} already exists, skipping.`);
    }
  }

  console.log('Seeding completed');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
});
