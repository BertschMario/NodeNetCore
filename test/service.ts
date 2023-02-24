import { Service } from '../src/service';
import { IService } from '../src/_utils';

@Service()
export class TestService extends IService {
  async call(v) {
    console.log('HERE Service', v);
    return await this.dispatch('D-Service');
  }
}
