namespace FlyWeightPattern {

    class Image {
        constructor(public url: string) { }
    }

    class Snowflake {
        image: Image;
        constructor(public style: string) {
            let url = style + '.png';
            this.image = new Image(url);
        }
        render(x: number, y: number, angle: number): void {
            // ...
            console.log(x,y,angle,'render',this.image.url);
        }

    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    class SnowflakeFactory {
        cache: { [style: string]: Snowflake; } = {};

        get(style: string): Snowflake {
            let cache = this.cache;
            let snowflake: Snowflake;
            if (hasOwnProperty.call(cache, style)) {
                snowflake = cache[style];
            } else {
                snowflake = new Snowflake(style);
                cache[style] = snowflake;
            }
            return snowflake;
        }
    }

    const SNOW_STYLES = ['A', 'B', 'C'];

    class Sky {
        constructor(public width: number, public height: number) { }

        snow(factory: SnowflakeFactory, count: number) {
            let stylesCount = SNOW_STYLES.length;
            for (let i = 0; i < count; i++) {
                let style = SNOW_STYLES[getRandomInteger(stylesCount)];
                let snowflake = factory.get(style);
                let x = getRandomInteger(this.width);
                let y = getRandomInteger(this.height);
                let angle = getRandomInteger(60);
                snowflake.render(x, y, angle);
            }
        }
    }

    function getRandomInteger(max: number): number {
        return Math.floor(Math.random() * max);
    }

    let snowflakeFactory =  new SnowflakeFactory();
    let sky = new Sky(100,20);
    sky.snow(snowflakeFactory,10);
    console.log(sky);
}