
# Djangoプロジェクトのルートディレクトリを入力する。
DJANGO_MANAGE_DIR="your-backend-project-directory-absolute-pass"

# 仮想環境(venv)有効化のためのactivateファイルの位置を記述する。
# 下の例では、venvフォルダはバックエンドプロジェクト下に配置している。
PYENV_ACTIVATE="$DJANGO_MANAGE_DIR/your-venv-name/bin/activate"


# Reactアプリのルートディレクトリ。このままで可。
REACT_APP_DIR=$(pwd)
# Djangoの静的ファイルディレクトリ。このままで可。
DJANGO_STATIC_DIR="$DJANGO_MANAGE_DIR/static"  
# Reactビルド成果物のディレクトリ。このままで可。
REACT_BUILD_DIR="$REACT_APP_DIR/build"
# Djangoのstatic/reactフォルダ。このままで可。buildフォルダの配置場所。
STATIC_REACT_DIR="$DJANGO_STATIC_DIR/react"
# djangoのstaticfilesディレクトリ。このままで可。
STATICFILES_DIR="$DJANGO_MANAGE_DIR/staticfiles"


###########################################




# Reactのビルドフォルダの削除
echo "DEBUG: REACT_BUILD_DIR=$REACT_BUILD_DIR"
if [ -d "$REACT_BUILD_DIR" ]; then
  rm -rf "$REACT_BUILD_DIR"
  echo "Cleaning up old build folder"
fi

# Reactのビルド
echo "Building React app..."
npm install
npm run build

# Djangoのstatic/reactフォルダを削除
echo "DEBUG: STATIC_BUILD_DIR=$STATIC_BUILD_DIR"
if [ -d "$STATIC_REACT_DIR" ]; then
  rm -rf "$STATIC_REACT_DIR"
  echo "Cleaning up old static/react folder"
fi

# Djangoのstaticfilesフォルダを削除
if [ -d "$STATICFILES_DIR" ]; then
  rm -rf "$STATICFILES_DIR"
  echo "Cleaning up old staticfiles folder"
fi

# Reactビルド成果物をDjangoのstatic/reactにコピー
echo "Copying build folder to $STATIC_REACT_DIR..."
mkdir -p "$STATIC_REACT_DIR"
cp -r "$REACT_BUILD_DIR/"* "$STATIC_REACT_DIR/"

# Djangoのcollectstaticを実行
echo "Running Django collectstatic..."
cd "$DJANGO_MANAGE_DIR"
. "$PYENV_ACTIVATE"
python manage.py collectstatic --noinput
echo "Build and deployment completed successfully."
