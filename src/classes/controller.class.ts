import { Server } from '../types';

/**
 * The BaseController class to be extended by all controllers
 */
export class IController {
  private _nn_method: string;
  private _nn_path: string;
  private _nn_useAuth: boolean;

  /**
   * Calls the service with the given arguments
   * @param {any} args The arguments to pass to the service
   * @return {Promise<any>} The result of the service call
   * @throws {message: string; code: number} If something goes wrong in the service
   */
  public async dispatch(...args: any): Promise<any> {}

  /**
   * Gets called when the API Path is called
   * @param {Server} server The server object
   * @return {Promise<any>} The result of API call
   * @throws {message: string; code: number} The server will respond with an error
   */
  public async call(server: Server): Promise<any> {}
}
