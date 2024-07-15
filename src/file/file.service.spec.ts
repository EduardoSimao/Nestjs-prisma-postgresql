import { Test, TestingModule } from "@nestjs/testing";
import { FileService } from "./file.service";
import { getPhoto } from "../testing/get-photo.mock";


describe('FilesService', () =>{

    let filesdervice: FileService

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FileService
            ]
        }).compile();

        filesdervice = module.get<FileService>(FileService);

    });

    test('Validate definition', () => {
        expect(filesdervice).toBeDefined();
    })

    describe('FileService Test', () =>{

        test('Upload method test', async () =>{
            
            const photo = await getPhoto();
            const filename = 'photo-test.jpeg';
            filesdervice.Upload(photo, filename);
        })
    })
})