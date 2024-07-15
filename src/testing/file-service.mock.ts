import { FileService } from '../file/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    getDestinationPath: jest.fn(),
    Upload: jest.fn().mockResolvedValue(''),
  },
};
