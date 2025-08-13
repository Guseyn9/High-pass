const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.css')
  .pipe(sourcemaps.init())
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/script.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
  .pipe(htmlMin({
    collapseWhitespace: true,
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite:'../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img'))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/*.svg',
    'src/img/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/img'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)