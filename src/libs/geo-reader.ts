
import { createWriteStream, existsSync } from 'fs';
import mmdbreader from 'maxmind-db-reader';
import https from 'https'

const geoDataFile = '/tmp/City.mmdb'

class GeoReader {
  private reader: any = undefined

  public async init() {
    if (existsSync(geoDataFile))
      return this.loadData()

    return new Promise((resolve) => {
      https.get('https://gitlab.com/leo108/geolite2-db/-/raw/master/City.mmdb', r => r
        .pipe(createWriteStream(geoDataFile))
        .on("finish", () => {
          console.log(`File saved to: ${geoDataFile}`)
          resolve(true)
        }))
    }).then(() => this.loadData())
  }

  async loadData() {
    return new Promise((resolve, reject) => {
      if (this.reader !== undefined) return resolve(1)

      return mmdbreader.open.call(this, geoDataFile, (err: Error, r: any) => {
        if (err) return reject(err);
        this.reader = r
        resolve(2)
      });
    })
  }

  public getGeoData(ipAddress: string) {
    return new Promise((resolve, reject) => {
      this.reader.getGeoData(ipAddress, (err: Error, results: any) => {
        if (err) reject(err); else resolve(results)
      })
    })
  }

  public getGeoDataSync(ipAddress: string) {
    this.reader.getGeoDataSync(ipAddress)
  }

  public getDatabaseMeta() {
    return this.reader.getDatabaseMetadata();
  }

}

export default new GeoReader()
