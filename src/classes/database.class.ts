/**
 * The BaseDatabase class to be extended by all databases
 */
export class IDatabase {
  /**
   * Gets called by the corresponding service
   * @param {any} args The arguments from the service
   * @return {Promise<any>} The result of the database call
   * @throws {message: string; code: number} If something goes wrong in the database
   */
  public async call(...args: any): Promise<any> {}
}
