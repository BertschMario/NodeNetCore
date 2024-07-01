/**
 * The BaseService class to be extended by all services
 */
export class IService {
  /**
   * Calls the database with the given arguments
   * @param {any} args The arguments to pass to the database
   * @return {Promise<any>} The result of the database call
   * @throws {message: string; code: number} If something goes wrong in the database
   */
  public async dispatch(...args: any): Promise<any> {}

  /**
   * Gets called by the corresponding controller
   * @param {any} args The arguments from the controller
   * @return {Promise<any>} The result of the service call
   * @throws {message: string; code: number} If something goes wrong in the service
   */
  public async call(...args: any): Promise<any> {}
}
