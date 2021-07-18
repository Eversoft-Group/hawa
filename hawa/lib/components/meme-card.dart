import 'package:flutter/cupertino.dart';

Widget MemeCard(String url) {
  return Container(
    child: Image.network(url),
  );
}
