import Hat from './Hat.astro';
import Toy from './Toy.astro';
import Spoiler from './Spoiler.astro';
import Photo from './Photo.astro';
import BenchLog from './BenchLog.astro';
import Table from './Table.astro';

/** Components every post can use without importing them. */
export const mdxComponents = { Hat, Toy, Spoiler, Photo, BenchLog, table: Table };
